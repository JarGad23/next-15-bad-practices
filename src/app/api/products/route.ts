import { NextResponse } from "next/server";

export async function GET() {
  const products = Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: (Math.random() * 100).toFixed(2),
    description: `This is a description of product ${index + 1}.`,
  }));

  return NextResponse.json(products);
}
