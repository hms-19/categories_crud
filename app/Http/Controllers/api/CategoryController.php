<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\UpdateCategoryResource;
use App\Http\Resources\UpdateSubCategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isNull;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::whereNull('parent_id')->orderBy('id','DESC')->get();

        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $valid = Validator::make($request->all(),[
            'name' => 'required',
        ]);

        if($valid->fails()){
            return response()->json([
                'errors' => $valid->errors()
            ]);
        }
        else{
            $category = new Category;

            $category->name = $request->name;
            $category->parent_id = $request->parent_id ?? null;

            $category->save();

            return new CategoryResource($category);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::findOrFail($id)->first();

        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $valid = Validator::make($request->all(),[
            'name' => 'required',
        ]);

        if($valid->fails()){
            return response()->json([
                'errors' => $valid->errors()
            ]);
        }
        else{
            $category = Category::findOrFail($id);

            $old_parent_id = $category->parent_id;

            if(isset($request->parent_id) && $category->parent_id == null){
                Category::where('parent_id',$category->id)->update(['parent_id' => $request->parent_id]);
            
                $category->name = $request->name;
                $category->parent_id = $request->parent_id ?? null;
                $category->save();

                $newCategory = Category::find($request->parent_id);

                $newCategory->parent_id = null;

                $newCategory->setAttribute('old_child_id',$category->id);

                return new UpdateSubCategoryResource($newCategory);
            }

            $category->name = $request->name;
            $category->parent_id = $request->parent_id ?? null;
            $category->save();

            $category->setAttribute('old_parent_id',$old_parent_id);

            return new UpdateCategoryResource($category);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $old_parent_id = $category->parent_id;


        if($category->parent_id == null){
            $scats = Category::where('parent_id',$category->id)->get();
            foreach($scats as $scat){
                $scat->delete();
            }
        }

        $category->delete();

        $category->setAttribute('old_parent_id',$old_parent_id);

        return new UpdateCategoryResource($category);
    }
}
