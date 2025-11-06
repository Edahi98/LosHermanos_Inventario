<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'stok',
        'precio_venta',
        'precio_compra',
        'nombre_articulo',
        'modelos_compatibles',
        'fecha_publicacion',
        'categoria_id',
        'marca_id',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }
}
