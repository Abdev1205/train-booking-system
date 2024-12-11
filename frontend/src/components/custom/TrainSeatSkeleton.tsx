import { Skeleton } from "@/components/ui/skeleton";

const TrainSeatSkeleton = () => {
  return (
    <div className="flex flex-wrap w-[20rem] gap-[.2rem]">
      {[...Array(80)].map((_, index) => (
        <div
          key={index}
          className={`relative flex mb-[.3rem] flex-col items-center justify-center
            ${(index + 1) % 7 === 4 ? "mr-8" : ""}`}
        >
          <Skeleton className="size-[2.3rem] rounded-md" />
          <Skeleton className="absolute bottom-0 bg-gray-300 size-[1rem] rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default TrainSeatSkeleton;
