<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

use function Symfony\Component\Translation\t;

class Articles extends Model
{
    /** @use HasFactory<\Database\Factories\ArticlesFactory> */
    use HasFactory,HasUuids;

    protected $fillable = [
        'name',
        'price',
        'category_id',
        'amount',
        'brand',
        'year',
        'image'
    ];  

    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }

    protected static function booted()
    {
        self::deleted(function (Articles $article){
        try{
            $image_name = explode('articles/',$article['image']);
            Storage::disk('public')->delete('articles/'.$image_name[1]);
        }catch(Throwable){}
        }
        );
    }
}
