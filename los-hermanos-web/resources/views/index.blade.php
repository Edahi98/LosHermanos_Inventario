@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Gestión de Categorías</h2>
            </div>
            <div class="pull-right mb-2">
                <a class="btn btn-success" href="{{ route('categorias.create') }}"> Crear Nueva Categoría</a>
            </div>
        </div>
    </div>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th width="280px">Acción</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($categorias as $categoria)
                <tr>
                    <td>{{ $categoria->id }}</td>
                    <td>{{ $categoria->nombre_categoria }}</td>
                    <td>
                        <form action="{{ route('categorias.destroy',$categoria->id) }}" method="POST">
                            <a class="btn btn-info" href="{{ route('categorias.show',$categoria->id) }}">Mostrar</a>
                            <a class="btn btn-primary" href="{{ route('categorias.edit',$categoria->id) }}">Editar</a>
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
