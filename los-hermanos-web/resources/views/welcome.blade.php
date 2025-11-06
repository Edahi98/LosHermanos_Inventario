@extends('layouts.app')

@section('content')
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Card Categorías -->
        <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div class="bg-blue-100 p-4 rounded-full mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0h-2M5 11H3"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Categorías</h3>
            <p class="text-gray-600 mb-4">Administre las categorías de productos.</p>
            <a href="{{ route('categorias.index') }}" class="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Ir
            </a>
        </div>

        <!-- Card Marcas -->
        <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div class="bg-green-100 p-4 rounded-full mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v1h- удобн-2V6a1 1 0 00-1-1H8a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1v-1h2v1a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m6 0l-2-2m2 2l-2 2"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Marcas</h3>
            <p class="text-gray-600 mb-4">Gestione las marcas de sus productos.</p>
            <a href="{{ route('marcas.index') }}" class="mt-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Ir
            </a>
        </div>

        <!-- Card Artículos -->
        <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div class="bg-indigo-100 p-4 rounded-full mb-4">
                <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Artículos</h3>
            <p class="text-gray-600 mb-4">Controle el inventario de artículos.</p>
            <a href="{{ route('articulos.index') }}" class="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Ir
            </a>
        </div>
    </div>
@endsection