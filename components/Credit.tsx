import { Cast, CreditProps, Crew } from "@/types/types";
import { ImageComponent } from ".";

// Type guard to check if credit is of type Cast
const isCast = (credit: Cast | Crew): credit is Cast => {
  return (credit as Cast).character !== undefined;
};

// Type guard to check if credit is of type Crew
const isCrew = (credit: Cast | Crew): credit is Crew => {
  return (credit as Crew).job !== undefined;
};

const Credit = ({ credit }: CreditProps) => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL ?? ""; 

  return (
    <div className='flex gap-4 min-h-[60px] h-[auto]'>
      <div className='relative w-[50px] h-[50px] my-2 object-contain'>
        <ImageComponent  
          baseUrl={imageBaseUrl}
          imageUrl={credit.profile_path ?? ""}
          alt={`image ${credit.name}`}
        ></ImageComponent>
      </div>
      <div className='flex flex-col gap-1'>
        <p className="text-gray-200 text-m"> Name: {credit.name || '-'}</p>

        {isCast(credit) && credit.character && (
          <p className="text-gray-200 text-m"> Character: {credit.character}</p>
        )}
        
        {isCrew(credit) && credit.job && (
          <p className="text-gray-200 text-m"> Job: {credit.job}</p>
        )}
      </div>
    </div>
  );
};

export default Credit;
