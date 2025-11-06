@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Detalles del Artículo</h1>
            <a href="{{ route('articulos.index') }}" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Volver
            </a>
        </div>

        <div class="bg-white shadow-2xl rounded-lg p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">ID:</strong>
                    <p class="text-gray-900">{{ $articulo->id }}</p>
                </div>
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">Nombre:</strong>
                    <p class="text-gray-900">{{ $articulo->nombre_articulo }}</p>
                </div>
                <div class="mb-4 md:col-span-2">
                    <strong class="text-gray-700 font-bold">Modelos Compatibles:</strong>
                    <p class="text-gray-900">{{ $articulo->modelos_compatibles }}</p>
                </div>
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">Precio Venta:</strong>
                    <p class="text-gray-900">${{ number_format($articulo->precio_venta, 2) }}</p>
                </div>
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">Precio Compra:</strong>
                    <p class="text-gray-900">${{ number_format($articulo->precio_compra, 2) }}</p>
                </div>
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">Stock:</strong>
                    <p class="text-gray-900">{{ $articulo->stok }}</p>
                </div>
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">Fecha Publicación:</strong>
                    <p class="text-gray-900">{{ $articulo->fecha_publicacion }}</p>
                </div>
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">Categoría:</strong>
                    <p class="text-gray-900">{{ $articulo->categoria->nombre_categoria }}</p>
                </div>
                <div class="mb-4">
                    <strong class="text-gray-700 font-bold">Marca:</strong>
                    <p class="text-gray-900">{{ $articulo->marca->nombre_marca }}</p>
                </div>
            </div>
        </div>
    </div>
@endsection
