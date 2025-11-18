@extends('layaouts.dashboard')

@section('title', 'Module Users: Larapets 🐶')

@section('content')
    <div class="overflow-x-auto rounded-box border text-white bg-[#0009]">
        <table class="table">
            <!-- head -->
            <thead>
                <tr class="text-white">
                    <th>Id</th>
                    <th>Document</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <th>{{ $user->id }}</th>
                        <td>{{ $user->document }}</td>
                        <td>{{ $user->fullname }}</td>
                        <td>{{ $user->email }}</td>
                        <td>
                            <a href="">Show</a>
                            <a href="">Edit</a>
                            <a href="">Delet</a>
                        </td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="5">{{ $user->links() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
@endsection
