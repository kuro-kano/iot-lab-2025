import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Book } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const { data: books, error } = useSWR<Book[]>("/books");

  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center transform transition-all duration-300 hover:bg-orange-900"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-6xl mb-4 font-bold">หนังสือ</h1>
        <h2 className="text-xl text-orange-100">รายการหนังสือทั้งหมด</h2>
      </section>

      <section className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-800">รายการหนังสือ</h1>

          <Button
            component={Link}
            leftSection={<IconPlus />}
            to="/books/create"
            size="sm"
            variant="filled"
            className="bg-orange-600 hover:bg-orange-700 transition-colors"
          >
            เพิ่มหนังสือ
          </Button>
        </div>

        {!books && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books?.map((book) => (
            <div
              className="border border-solid border-neutral-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              key={book.id}
            >
              <img
                src="https://placehold.co/150x200"
                alt={book.title}
                className="w-full object-cover aspect-[3/4] hover:opacity-90 transition-opacity"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2 text-gray-800">{book.title}</h2>
                <p className="text-sm text-neutral-500 mt-1">โดย {book.author}</p>
              </div>

              <div className="flex justify-end px-4 pb-4">
                <Button
                  component={Link}
                  to={`/books/${book.id}`}
                  size="xs"
                  variant="light"
                  className="hover:bg-orange-100"
                >
                  ดูรายละเอียด
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
