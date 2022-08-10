<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UpdateSubCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'parent_id' => $this->parent_id ?? null,
            'old_child_id' => $this->old_child_id,
            'sub_category' => SubCategoryResource::collection($this->sub_categories)
        ];
    }

    public function with($request){
        return [
            'message' => 'Success'
        ];
    }
}
