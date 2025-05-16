// // app/api/news/[id]/route.js
// import { NextResponse } from "next/server";
// import { News } from "@/models/newsModel";

// export async function GET(req, { params }) {
//   try {
//     const news = await News.findByPk(params.id);
//     if (!news) return NextResponse.json({ error: "News not found" }, { status: 404 });
//     return NextResponse.json(news);
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     const formData = await req.formData();
//     const title = formData.get("title");
//     const publisherName = formData.get("publisherName");
//     const description = formData.get("description");
//     const categoryId = formData.get("categoryId");
//     const publishedAt = formData.get("publishedAt");
//     const file = formData.get("image");

//     const news = await News.findByPk(params.id);
//     if (!news) return NextResponse.json({ error: "News not found" }, { status: 404 });

//     const updatedData = {
//       title,
//       publisherName,
//       description,
//       categoryId,
//       publishedAt: publishedAt || Date.now(),
//     };

//     if (file && typeof file === "object") {
//       const filename = await uploadImage(file); // Implement file upload
//       updatedData.image = filename;
//     }

//     await news.update(updatedData);
//     return NextResponse.json(news);
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     const news = await News.findByPk(params.id);
//     if (!news) return NextResponse.json({ error: "News not found" }, { status: 404 });

//     await news.destroy();
//     return NextResponse.json({ message: "News deleted successfully" });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
