@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left mb-2">
                <h2>Mostrar Marca</h2>
            </div>
            <div class="pull-right">
                <a class="btn btn-primary" href="{{ route('marcas.index') }}"> Volver</a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>ID:</strong>
                {{ $marca->id }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Nombre de la Marca:</strong>
                {{ $marca->nombre_marca }}
            </div>
        </div>
    </div>
@endsection
@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left mb-2">
                <h2>Mostrar Categoría</h2>
            </div>
            <div class="pull-right">
                <a class="btn btn-primary" href="{{ route('categorias.index') }}"> Volver</a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>ID:</strong>
                {{ $categoria->id }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Nombre de la Categoría:</strong>
                {{ $categoria->nombre_categoria }}
            </div>
        </div>
    </div>
@endsection
