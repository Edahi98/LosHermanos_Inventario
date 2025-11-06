@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Marcas</h2>
            </div>
            <div class="pull-right">
                <a class="btn btn-success" href="{{ route('marcas.create') }}"> Create New Marca</a>
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
            <th width="280px">Action</th>
        </tr>
        @foreach ($marcas as $marca)
        <tr>
            <td>{{ $marca->id }}</td>
            <td>{{ $marca->nombre_marca }}</td>
            <td>
                <form action="{{ route('marcas.destroy',$marca->id) }}" method="POST">
                    <a class="btn btn-info" href="{{ route('marcas.show',$marca->id) }}">Show</a>
                    <a class="btn btn-primary" href="{{ route('marcas.edit',$marca->id) }}">Edit</a>
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
@endsection
