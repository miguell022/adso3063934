@forelse ($pets as $pet)
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
@empty
    <tr>
        <td colspan="8">
            <div class="flex flex-col items-center justify-center gap-6 my-20 max-w-md mx-auto">
                <div class="bg-white rounded-full p-8 shadow-2xl border-4 border-pink-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#ec4899"
                        viewBox="0 0 256 256">
                        <path
                            d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
                        </path>
                    </svg>
                </div>
                <h2 class="text-2xl font-semibold text-gray-700">No pets found</h2>
                <p class="text-center text-gray-600">Try adjusting your search criteria to find what you're looking
                    for.</p>
            </div>
        </td>
@endforelse
