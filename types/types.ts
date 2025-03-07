export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: string[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface Trailer {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

export interface MovieDetailsType {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: any
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }

  export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null; // profile path could be null in some cases
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }

  export interface MovieCredits {
    cast: Cast[]
    crew: Crew[]
  }

  export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null; // profile path could be null in some cases
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }

  export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string; // Can be "Production" or other departments.
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null; // profile path could be null in some cases
    credit_id: string;
    department: string; // Department like "Production", "Directing", etc.
    job: string; // Job title in the department, such as "Producer"
  }
  
  export interface Genre {
    id: number
    name: string
  }

  export interface GenreProps {
    genre: Genre
  }
  
  export interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
  

export interface MovieProps {
    movie: Movie
    trailers?: Trailer[]
    type?: "explore" | "list"
}

export interface CarouselProps {
  movies: Movie[]
  text: string
}

export interface CreditProps {
  credits: MovieCredits
}

export interface MovieDetailsProps {
    movie: MovieDetailsType
    trailers?: Trailer[]
    credits: MovieCredits
}

export interface SearchBarProps {
    handleClick: (val: string) => void;
}
export interface ImageComponentProps {
  baseUrl: string
  imageUrl: string
  alt: string
  w?: string
  h?: string
}