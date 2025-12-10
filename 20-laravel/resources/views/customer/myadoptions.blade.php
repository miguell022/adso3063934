@extends('layouts.dashboard')

@section('title', 'My Adoptions: Larapets 🐶')

@section('content')

    <h1
        class="text-4xl flex gap-2 items-center justify-center pb-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border-2 border-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
            <path
                d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
            </path>
        </svg>

        My Adoptions
    </h1>

    @csrf
    <div class="datalist flex flex-col gap-3 items-center justify-center">
        {{-- Adoption Records --}}
        @forelse ($adoptions as $adoption)
            <div class="avatar-group -space-x-6 mb-4">
                <div class="avatar">
                    <div class="w-32">
                        <img src="{{ asset('images/' . $adoption->user->photo) }}" />
                    </div>
                </div>
                <div class="avatar">
                    <div class="w-32">
                        <img src="{{ asset('images/' . $adoption->pet->image) }}" />
                    </div>
                </div>
            </div>
            <h4
                class="bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-gray-300 px-6 py-3 mb-4 text-gray-900 text-lg font-semibold text-center inline-block">
                <span class="text-teal-600 underline font-bold">{{ $adoption->pet->name }}</span>
                <span class="text-gray-800">was adopted by</span>
                <span class="text-blue-600 underline font-bold">{{ $adoption->user->fullname }}</span>
                <br>
                <span class="text-gray-600 text-sm font-normal">{{ $adoption->created_at->diffForHumans() }}</span>
            </h4>
            <a href="{{ url('myadoptions/' . $adoption->id) }}" class="btn btn-info mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                    <path
                        d="M152,112a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Zm77.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88.11,88.11,0,1,1,11.31-11.31l50.07,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z">
                    </path>
                </svg>
                More info
            </a>
            <span class="border-b-1 border-dashed mt-8 border-[#fff6] h2 w-4/12"></span>
        @empty
            {{-- Empty State --}}
            <div class="flex flex-col items-center justify-center gap-6 my-20 max-w-md mx-auto">
                <div class="bg-white rounded-full p-8 shadow-2xl border-4 border-pink-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#ec4899"
                        viewBox="0 0 256 256">
                        <path
                            d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
                        </path>
                    </svg>
                </div>
                <div
                    class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-blue-200 px-10 py-8 text-center">
                    <h3 class="text-3xl font-bold text-gray-800 mb-3">No Adoptions Yet!</h3>
                    <p class="text-gray-600 text-lg mb-6">You haven't adopted any pets yet. Start your journey and give a
                        pet a loving home!</p>
                    <a href="{{ url('makeadoption') }}"
                        class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
                            </path>
                        </svg>
                        Browse Available Pets
                    </a>
                </div>
            </div>
        @endforelse
    </div>

@endsection
