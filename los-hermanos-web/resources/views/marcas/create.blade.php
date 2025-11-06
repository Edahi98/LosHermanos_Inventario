@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Agregar Nueva Marca</h1>
            <a href="{{ route('marcas.index') }}" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
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
            <form action="{{ route('marcas.store') }}" method="POST">
                @csrf
                <div class="mb-6">
                    <label for="nombre_marca" class="block text-gray-700 text-sm font-bold mb-2">Nombre de la Marca:</label>
                    <input type="text" name="nombre_marca" id="nombre_marca" class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ingrese el nombre de la marca">
                </div>

                <div class="flex items-center justify-end">
                    <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        Guardar Marca
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection
