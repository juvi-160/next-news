// import { NextResponse } from "next/server";
// import Category from "@/models/categoryModel";

// export async function PUT(req, { params }) {
//   try {
//     const body = await req.json();
//     const category = await Category.findByPk(params.id);
//     if (!category) return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });

//     category.name = body.name;
//     await category.save();

//     return NextResponse.json({ success: true, category });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(_, { params }) {
//   try {
//     const deleted = await Category.destroy({ where: { id: params.id } });
//     return NextResponse.json({ success: deleted > 0 });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }
