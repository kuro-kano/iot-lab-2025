import { Alert, Badge, Button, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { Link, useParams } from "react-router-dom";
import { Book } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconEdit, IconArrowLeft } from "@tabler/icons-react";

export default function BookByIdPage() {
  const { bookId } = useParams();

  const { data: book, isLoading, error } = useSWR<Book>(`/books/${bookId}`);

  return (
    <Layout>
      <Container className="mt-8 mb-16">
        {isLoading && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}

        {!!book && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="italic text-neutral-500 mb-8 text-lg">โดย {book.author}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <img
                src="https://placehold.co/150x200"
                alt={book.title}
                className="w-full object-cover aspect-[3/4] rounded-lg shadow-md hover:shadow-xl transition-shadow"
              />
              
              <div className="col-span-2 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-orange-800 mb-3">รายละเอียดหนังสือ</h3>
                  <p className="indent-4 text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit...
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-orange-800 mb-3">เรื่องย่อ</h3>
                  <p className="indent-4 text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur...
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-orange-800 mb-3">หมวดหมู่</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge color="orange" size="lg" className="hover:bg-orange-200 cursor-pointer">#หมวดหมู่ 1</Badge>
                    <Badge color="orange" size="lg" className="hover:bg-orange-200 cursor-pointer">#หมวดหมู่ 2</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Divider className="my-8" />

            <div className="flex gap-4">
              <Button
                variant="light"
                size="sm"
                component={Link}
                to="/books"
                leftSection={<IconArrowLeft />}
                className="hover:bg-gray-100 transition-colors"
              >
                กลับไปหน้ารายการหนังสือ
              </Button>

              <Button
                color="blue"
                size="sm"
                component={Link}
                to={`/books/${book.id}/edit`}
                leftSection={<IconEdit />}
                className="bg-orange-600 hover:bg-orange-700 transition-colors"
              >
                แก้ไขข้อมูลหนังสือ
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}
