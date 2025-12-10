@extends('layouts.dashboard')

@section('title', 'Make Adoption: Larapets 🐶')

@section('content')

    <h1
        class="text-4xl flex gap-2 items-center justify-center pb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border-2 border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
            <path
                d="M231.67,60.89a35.82,35.82,0,0,0-23.82-12.74,36,36,0,1,0-66.37,22.92.25.25,0,0,1,0,.08L71.17,141.51s0,0-.1,0a36,36,0,1,0-22.92,66.37,36,36,0,1,0,66.37-22.92.54.54,0,0,1,0-.08l70.35-70.36s0,0,.1,0a36,36,0,0,0,46.74-53.63ZM219.1,97.16a20,20,0,0,1-25.67,3.8,16,16,0,0,0-19.88,2.19l-70.4,70.4A16,16,0,0,0,101,193.43a20,20,0,1,1-36.75,7.5,8,8,0,0,0-7.91-9.24,8.5,8.5,0,0,0-1.23.1A20,20,0,1,1,62.57,155a16,16,0,0,0,19.88-2.19l70.4-70.4A16,16,0,0,0,155,62.57a20,20,0,1,1,36.75-7.5,8,8,0,0,0,9.14,9.14,20,20,0,0,1,18.17,33Z">
            </path>
        </svg>

        Make Adoption
    </h1>
    {{-- Breadcrumbs --}}
    <div class="breadcrumbs text-sm bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 text-gray-800 mb-6">
        <ul>
            <li>
                <a href="{{ url('dashboard') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z">
                        </path>
                    </svg>
                    Dashboard
                </a>
            </li>
            <li>
                <a href="{{ url('makeadoption') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256"
                        viewBox="0 0 256 256">
                        <path
                            d="M231.67,60.89a35.82,35.82,0,0,0-23.82-12.74,36,36,0,1,0-66.37,22.92.25.25,0,0,1,0,.08L71.17,141.51s0,0-.1,0a36,36,0,1,0-22.92,66.37,36,36,0,1,0,66.37-22.92.54.54,0,0,1,0-.08l70.35-70.36s0,0,.1,0a36,36,0,0,0,46.74-53.63ZM219.1,97.16a20,20,0,0,1-25.67,3.8,16,16,0,0,0-19.88,2.19l-70.4,70.4A16,16,0,0,0,101,193.43a20,20,0,1,1-36.75,7.5,8,8,0,0,0-7.91-9.24,8.5,8.5,0,0,0-1.23.1A20,20,0,1,1,62.57,155a16,16,0,0,0,19.88-2.19l70.4-70.4A16,16,0,0,0,155,62.57a20,20,0,1,1,36.75-7.5,8,8,0,0,0,9.14,9.14,20,20,0,0,1,18.17,33Z">
                        </path>
                    </svg>
                    Make adoption
                </a>
            </li>
        </ul>
    </div>
    {{-- Search --}}
    <label class="input outline-none mb-10">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg>
        <input id="qsearch" type="search" placeholder="Search..." name="qsearch" />
    </label>

    @if (session('success'))
        <div role="alert" class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ session('success') }}</span>
        </div>
    @endif
    @if (session('error'))
        <div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2 2 2m-2-2v6M12 8v.01" />
            </svg>
            <span>{{ session('error') }}</span>
        </div>
    @endif


    {{-- Table --}}
    <div class="overflow-x-auto rounded-box border text-white bg-[#0009]">
        <table class="table">
            <!-- head -->
            <thead>
                <tr class="text-white">
                    <th class="hidden md:table-cell">Id</th>
                    <th>Image</th>
                    <th>Kind</th>
                    <th>Name</th>
                    <th class="hidden md:table-cell">Breed</th>
                    <th class="hidden md:table-cell">Description</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="datalist">
                @foreach ($pets as $pet)
                    <tr @if ($pet->id % 2 == 0) class="bg-[#0006]" @endif>
                        <th class="hidden md:table-cell">{{ $pet->id }}</th>
                        <td>
                            <div class="avatar">
                                <div class="mask mask-squircle w-20 bg-white">
                                    <img src="{{ asset('images/' . $pet->image) }}" />
                                </div>
                            </div>
                        </td>
                        <td>
                            @if ($pet->kind == 'Dog')
                                <div class="badge badge-success">Dog</div>
                            @elseif ($pet->kind == 'Cat')
                                <div class="badge badge-primary">Cat</div>
                            @elseif ($pet->kind == 'Pig')
                                <div class="badge badge-secondary">Pig</div>
                            @elseif ($pet->kind == 'Bird')
                                <div class="badge badge-warning">Bird</div>
                            @else
                                <div class="badge">{{ $pet->kind }}</div>
                            @endif
                        </td>
                        <td>{{ $pet->name }}</td>
                        <td class="hidden md:table-cell">{{ $pet->breed }}</td>
                        <td class="hidden md:table-cell truncate max-w-xs" title="{{ $pet->description }}">
                            {{ Str::limit($pet->description, 50) }}</td>
                        <td>
                            @if ($pet->status == 1)
                                <div class="badge badge-outline badge-success">Available</div>
                            @else
                                <div class="badge badge-outline badge-warning">Adopted</div>
                            @endif
                        </td>
                        <td>
                            <a class="btn btn-xs" href="{{ url('makeadoption/' . $pet->id) }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z">
                                    </path>
                                </svg>
                            </a>
                        </td>
                    </tr>
                @endforeach
                <tr class="bg-[#0009]">
                    <td colspan="8">{{ $pets->links('layouts.pagination') }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <button class="btn hidden" onclick="modal_message.showModal()">open modal</button>
    <dialog id="modal_message" class="modal">
        <div class="modal-box bg-black text-white">
            <h3 class="text-lg font-bold">Congratulations!</h3>
            <div role="alert" class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ session('success') }}</span>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

    <!-- Delete Modal -->
    <dialog id="modal_delete" class="modal">
        <div class="modal-box bg-red-50">
            <h3 class="text-lg font-bold text-red-700">Are you sure?</h3>
            <p class="py-4 text-gray-700">You are about to delete the pet: <strong class="name"></strong></p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Cancel</button>
                </form>
                <button class="btn btn-error btn-confirm">Confirm Delete</button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
@endsection

@section('js')
    <script>
        $(document).ready(function() {
            //Modal
            const modal_message = document.getElementById('modal_message');
            @if (session('success'))
                modal_message.showModal();
            @endif
            // Search
            function debounce(func, wait) {
                let timeout
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout)
                        func(...args)
                    };
                    clearTimeout(timeout)
                    timeout = setTimeout(later, wait)
                }
            }
            const search = debounce(function(query) {

                $token = $('meta[name=csrf-token]').attr('content')

                $.post("{{ url('search/makeadoption') }}", {
                        'qsearch': query,
                        '_token': $token
                    },
                    function(data) {
                        $('.datalist').html(data).hide().fadeIn(1000)
                    }
                ).fail(function(xhr, status, error) {
                    $('.datalist').html(`<tr>
                        <td colspan="8" class="text-center py-18 text-red-500">
                            Error: ${error}
                        </td>
                    </tr>`);
                });
            }, 500)
            $('body').on('input', '#qsearch', function(event) {
                event.preventDefault()
                const query = $(this).val()

                $('.datalist').html(`<tr>
                                        <td colspan="8" class="text-center py-18">
                                            <span class="loading loading-spinner text-warning"></span>
                                        </td>
                                    </tr>`)

                if (query != '') {
                    search(query)
                } else {
                    setTimeout(() => {
                        window.location.replace('makeadoption')
                    }, 500)
                }
            })
        })
    </script>

@endsection
