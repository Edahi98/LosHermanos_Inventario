@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Articulos</h2>
            </div>
            <div class="pull-right">
                <a class="btn btn-success" href="{{ route('articulos.create') }}"> Create New Articulo</a>
            </div>
        </div>
    </div>

    @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }}</p>
        </div>
    @endif

    <table class="table table-bordered">
        <tr>
            <th>No</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>Precio Venta</th>
            <th>Precio Compra</th>
            <th>Stock</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($articulos as $articulo)
        <tr>
            <td>{{ $articulo->id }}</td>
            <td>{{ $articulo->nombre_articulo }}</td>
            <td>{{ $articulo->categoria->nombre_categoria }}</td>
            <td>{{ $articulo->marca->nombre_marca }}</td>
            <td>{{ $articulo->precio_venta }}</td>
            <td>{{ $articulo->precio_compra }}</td>
            <td>{{ $articulo->stok }}</td>
            <td>
                <form action="{{ route('articulos.destroy',$articulo->id) }}" method="POST">
                    <a class="btn btn-info" href="{{ route('articulos.show',$articulo->id) }}">Show</a>
                    <a class="btn btn-primary" href="{{ route('articulos.edit',$articulo->id) }}">Edit</a>
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
@endsection
