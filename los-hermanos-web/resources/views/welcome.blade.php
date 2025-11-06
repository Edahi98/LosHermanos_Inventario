@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <h1 class="mt-5">Los Hermanos Inventario</h1>
                <p class="lead">Bienvenido al sistema de inventario.</p>
                <div class="mt-4">
                    <a href="{{ route('categorias.index') }}" class="btn btn-primary btn-lg mx-2">Gestionar Categorias</a>
                    <a href="{{ route('marcas.index') }}" class="btn btn-secondary btn-lg mx-2">Gestionar Marcas</a>
                    <a href="{{ route('articulos.index') }}" class="btn btn-info btn-lg mx-2">Gestionar Articulos</a>
                </div>
            </div>
        </div>
    </div>
@endsection