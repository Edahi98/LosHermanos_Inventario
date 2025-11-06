@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Agregar Nuevo Artículo</h1>
            <a href="{{ route('articulos.index') }}" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Volver
            </a>
        </div>

        @if ($errors->any())
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
                <p class="font-bold">¡Vaya! Hubo algunos problemas con su entrada.</p>
                <ul class="mt-2 list-disc list-inside">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="bg-white shadow-2xl rounded-lg p-6">
            <form action="{{ route('articulos.store') }}" method="POST">
                @csrf
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="nombre_articulo" class="block text-gray-700 text-sm font-bold mb-2">Nombre del Artículo:</label>
                        <input type="text" name="nombre_articulo" id="nombre_articulo" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ingrese el nombre del artículo">
                    </div>
                    <div>
                        <label for="modelos_compatibles" class="block text-gray-700 text-sm font-bold mb-2">Modelos Compatibles:</label>
                        <textarea name="modelos_compatibles" id="modelos_compatibles" rows="3" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ingrese los modelos compatibles"></textarea>
                    </div>
                    <div>
                        <label for="precio_venta" class="block text-gray-700 text-sm font-bold mb-2">Precio de Venta:</label>
                        <input type="number" step="0.01" name="precio_venta" id="precio_venta" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ingrese el precio de venta">
                    </div>
                    <div>
                        <label for="precio_compra" class="block text-gray-700 text-sm font-bold mb-2">Precio de Compra:</label>
                        <input type="number" step="0.01" name="precio_compra" id="precio_compra" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ingrese el precio de compra">
                    </div>
                    <div>
                        <label for="stok" class="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
                        <input type="number" name="stok" id="stok" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ingrese la cantidad en stock">
                    </div>
                    <div>
                        <label for="fecha_publicacion" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Publicación:</label>
                        <input type="date" name="fecha_publicacion" id="fecha_publicacion" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div>
                        <label for="categoria_id" class="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
                        <select name="categoria_id" id="categoria_id" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            @foreach ($categorias as $categoria)
                                <option value="{{ $categoria->id }}">{{ $categoria->nombre_categoria }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label for="marca_id" class="block text-gray-700 text-sm font-bold mb-2">Marca:</label>
                        <select name="marca_id" id="marca_id" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            @foreach ($marcas as $marca)
                                <option value="{{ $marca->id }}">{{ $marca->nombre_marca }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="flex items-center justify-end mt-6">
                    <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        Guardar Artículo
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection
