<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Los Hermanos Inventario</title>
    <link href="https://cdn.jsdelivr.net/npm/heroicons@2.1.3/css/solid.min.css" rel="stylesheet">
    @vite('resources/css/app.css')
    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
        .hero {
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1581091012184-7e0c9c9c5b5c?auto=format&fit=crop&w=1350&q=80') center/cover no-repeat;
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">

    <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-6 py-3">
            <div class="flex justify-between items-center">
                <a class="text-2xl font-bold text-gray-800" href="{{ route('home') }}">
                    Los Hermanos
                </a>
                <div class="hidden md:flex items-center space-x-4">
                    <a href="{{ route('categorias.index') }}" class="px-4 py-2 text-gray-600 hover:text-indigo-600 transition duration-300 {{ request()->routeIs('categorias.*') ? 'font-bold text-indigo-600' : '' }}">Categorías</a>
                    <a href="{{ route('marcas.index') }}" class="px-4 py-2 text-gray-600 hover:text-indigo-600 transition duration-300 {{ request()->routeIs('marcas.*') ? 'font-bold text-indigo-600' : '' }}">Marcas</a>
                    <a href="{{ route('articulos.index') }}" class="px-4 py-2 text-gray-600 hover:text-indigo-600 transition duration-300 {{ request()->routeIs('articulos.*') ? 'font-bold text-indigo-600' : '' }}">Artículos</a>
                </div>
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-button" class="text-gray-600 hover:text-indigo-600 focus:outline-none">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="mobile-menu" class="md:hidden hidden mt-3">
                <a href="{{ route('categorias.index') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Categorías</a>
                <a href="{{ route('marcas.index') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Marcas</a>
                <a href="{{ route('articulos.index') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Artículos</a>
            </div>
        </div>
    </nav>

    @if(request()->routeIs('home'))
        <header class="hero text-white text-center py-20">
            <div class="container mx-auto">
                <h1 class="text-5xl font-extrabold mb-4">Inventario Los Hermanos</h1>
                <p class="text-xl mb-8">Gestión de stock de componentes electrónicos.</p>
                <a href="{{ route('articulos.index') }}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    Ver Artículos
                </a>
            </div>
        </header>
    @endif

    <main class="container mx-auto px-6 py-8">
        @yield('content')
    </main>

    <footer class="bg-white shadow-inner mt-8 py-6">
        <div class="container mx-auto text-center text-gray-600">
            <p>&copy; {{ date('Y') }} Los Hermanos Inventario. Todos los derechos reservados.</p>
        </div>
    </footer>

    @vite('resources/js/app.js')
    <script>
        document.getElementById('mobile-menu-button').onclick = function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        };
    </script>
</body>
</html>
