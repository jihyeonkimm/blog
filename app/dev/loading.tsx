// import { Skeleton } from '@/components/ui/skeleton';

// export default function Loading() {
//   return (
//     <div className="container mx-auto px-4 py-8 space-y-8">
//       <div className="space-y-8">
//         {/* 헤더: 제목과 정렬 선택 */}
//         <div className="flex items-center justify-between">
//           <Skeleton className="h-10 w-24" />
//           <Skeleton className="h-10 w-32" />
//         </div>
//       </div>

//       {/* 포스트 목록 */}
//       <div className="space-y-6">
//         <div className="grid gap-4">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} className="flex flex-row justify-between items-center">
//               <div className="py-3 grow">
//                 <div className="mb-2 md:mb-4">
//                   <Skeleton className="h-4 w-16" />
//                 </div>
//                 <Skeleton className="h-4 md:h-6 w-full mb-2" />
//                 <Skeleton className="h-3 md:h-4 w-full mb-2" />
//                 <Skeleton className="h-3 md:h-4 w-16 mt-3 md:mt-6" />
//               </div>
//               <Skeleton className="shrink-0 w-30 md:w-40 h-20 md:h-24 rounded-md ml-4" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
