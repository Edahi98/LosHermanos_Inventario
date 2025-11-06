@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Detalles de la Marca</h1>
            <a href="{{ route('marcas.index') }}" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Volver
            </a>
        </div>

        <div class="bg-white shadow-2xl rounded-lg p-6">
            <div class="mb-4">
                <strong class="text-gray-700 font-bold">ID:</strong>
                <p class="text-gray-900">{{ $marca->id }}</p>
            </div>
            <div>
                <strong class="text-gray-700 font-bold">Nombre:</strong>
                <p class="text-gray-900">{{ $marca->nombre_marca }}</p>
            </div>
        </div>
    </div>
@endsection
