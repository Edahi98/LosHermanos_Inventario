@extends('layouts.app')

@section('content')
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
        <div class="w-full max-w-md">
            <div class="bg-white rounded-lg shadow p-8">
                <h2 class="text-2xl font-semibold text-center mb-6">Registrarse</h2>

                @if ($errors->any())
                    <div class="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded mb-4" role="alert">
                        <strong>¡Error!</strong>
                        <ul class="list-disc list-inside mt-2">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('register') }}" method="POST">
                    @csrf
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="name">Nombre</label>
                        <input type="text" name="name" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value="{{ old('name') }}" required>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Email</label>
                        <input type="email" name="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value="{{ old('email') }}" required>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="password">Contraseña</label>
                        <input type="password" name="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
                    </div>

                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="password_confirmation">Confirmar Contraseña</label>
                        <input type="password" name="password_confirmation" id="password_confirmation" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required>
                    </div>

                    <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">Registrarse</button>
                </form>

                <p class="text-center text-gray-600 mt-4">
                    ¿Ya tienes cuenta? <a class="text-indigo-600 hover:text-indigo-700" href="{{ route('login') }}">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    </div>
@endsection
