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
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://tse3.mm.bing.net/th/id/OIP.WF3fFRQuKZrZT1Cl-GjEyQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3') center/cover no-repeat;
        }
    </style>
</head>
<body>

    <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="container mx-auto px-6 py-3">
            <div class="flex justify-between items-center">
                <a class="text-2xl font-bold text-gray-800" href="{{ route('home') }}">
                    Los Hermanos
                </a>
                <div class="hidden md:flex items-center space-x-4">
                    @auth
                        <a href="{{ route('categorias.index') }}" class="px-4 py-2 text-gray-600 hover:text-indigo-600 transition duration-300 {{ request()->routeIs('categorias.*') ? 'font-bold text-indigo-600' : '' }}">Categorías</a>
                        <a href="{{ route('marcas.index') }}" class="px-4 py-2 text-gray-600 hover:text-indigo-600 transition duration-300 {{ request()->routeIs('marcas.*') ? 'font-bold text-indigo-600' : '' }}">Marcas</a>
                        <a href="{{ route('articulos.index') }}" class="px-4 py-2 text-gray-600 hover:text-indigo-600 transition duration-300 {{ request()->routeIs('articulos.*') ? 'font-bold text-indigo-600' : '' }}">Artículos</a>
                    @endauth
                    <div class="relative">
                        @auth
                            <button id="user-menu-button" class="px-4 py-2 text-gray-600 hover:text-indigo-600 focus:outline-none flex items-center">
                                {{ Auth::user()->name }} <svg class="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                            </button>
                            <div id="user-dropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden">
                                <a href="#" class="block px-4 py-2 text-gray-600 hover:bg-indigo-50 rounded-t-lg">Mi Perfil</a>
                                <form action="{{ route('logout') }}" method="POST">
                                    @csrf
                                    <button type="submit" class="w-full text-left px-4 py-2 text-gray-600 hover:bg-indigo-50 rounded-b-lg">Cerrar Sesión</button>
                                </form>
                            </div>
                        @else
                            <a href="{{ route('login') }}" class="px-4 py-2 text-gray-600 hover:text-indigo-600 transition duration-300">Iniciar Sesión</a>
                            <a href="{{ route('register') }}" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">Registrarse</a>
                        @endauth
                    </div>
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
                @auth
                    <a href="{{ route('categorias.index') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Categorías</a>
                    <a href="{{ route('marcas.index') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Marcas</a>
                    <a href="{{ route('articulos.index') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Artículos</a>
                    <form action="{{ route('logout') }}" method="POST" class="block">
                        @csrf
                        <button type="submit" class="w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Cerrar Sesión</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Iniciar Sesión</a>
                    <a href="{{ route('register') }}" class="block py-2 px-4 text-sm text-gray-600 hover:bg-indigo-50 rounded transition duration-300">Registrarse</a>
                @endauth
            </div>
        </div>
    </nav>

    @if(request()->routeIs('home'))
        <header class="hero text-white text-center py-20">
            <div class="container mx-auto">
                <h1 class="text-5xl font-extrabold mb-4">Inventario Los Hermanos</h1>
                <p class="text-xl mb-8">Gestión de stock de refaciones.</p>
                @auth
                    <a href="{{ route('articulos.index') }}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        Ver Artículos
                    </a>
                @else
                    <a href="{{ route('login') }}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        Iniciar Sesión
                    </a>
                @endauth
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
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').onclick = function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        };

        // User dropdown toggle
        const userMenuButton = document.getElementById('user-menu-button');
        const userDropdown = document.getElementById('user-dropdown');
        
        if (userMenuButton) {
            userMenuButton.addEventListener('click', function(e) {
                e.preventDefault();
                userDropdown.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.add('hidden');
                }
            });
        }
    </script>
</body>
</html>
