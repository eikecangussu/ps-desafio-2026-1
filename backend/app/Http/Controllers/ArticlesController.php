<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseRequest;
use App\Models\Articles;
use App\Http\Requests\StoreArticlesRequest;
use App\Http\Requests\UpdateArticlesRequest;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ArticlesController extends Controller
{

    protected $article;
    public function __construct(Articles $article){
        $this->article = $article;
    }
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        $articles = $this->article->with('category')->get();
        return response()->json($articles,Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticlesRequest $request) : JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')){
            $path = $request->file('image')->store('articles','public');
            $data['image'] = url('storage/'.$path);
        }

        $article = $this->article->create($data);
        $id = $article->id;
        $article_category = $this->article->with('category')->findOrFail($id);

        return response()->json($article_category,Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id) : JsonResponse
    {
        $article = $this->article->with('category')->findOrFail($id);
        return response()->Json($article,Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticlesRequest $request, $id): JsonResponse
    {
        $article = $this->article->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')){
            try{
                $image_name = explode('articles/',$article['image']);
                Storage::disk('public')->delete('articles/'.$image_name[1]);
            } catch(Throwable){}
            finally{
                $path = $request->file('image')->store('articles','public');
                $data['image'] = url( 'storage'.$path);
            }
        }

        
        $article->update($data);

        return response()->Json($article,Response::HTTP_OK);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) : JsonResponse
    {
        $article = $this->article->findOrFail($id);
        $article->delete();
        return response()->json(['Artigo deletado com sucesso']);
    }

    public function purchase(PurchaseRequest $request, $id) : JsonResponse
    {
        $quantityToBuy = $request->input('quantity');
        DB::beginTransaction();
        try {
            $article = $this->article->findOrFail($id);
            if ($article->amount < $quantityToBuy) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Estoque insuficiente para a quantidade solicitada.'
                ],400); 
            }
            $article->amount -= $quantityToBuy;
            $article->save();
            DB::commit();
            return response()->json([$article, $quantityToBuy, Response::HTTP_OK]);
        } catch (Throwable) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro ao processar a compra.'
            ],500);
        }
    }
}
