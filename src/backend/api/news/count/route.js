// // app/api/news/count/route.js
// import { NextResponse } from "next/server";
// import { News } from "@/models/newsModel";
// import { Category } from "@/models/categoryModel";

// export async function GET() {
//   try {
//     const total = await News.count();
//     const categories = await Category.findAll();
//     const counts = { total };

//     for (const category of categories) {
//       counts[category.name.toLowerCase()] = await News.count({
//         where: { categoryId: category.id },
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       ...counts,
//     });
//   } catch (error) {
//     console.error("Error getting news counts:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to get news counts",
//       },
//       { status: 500 }
//     );
//   }
// }
