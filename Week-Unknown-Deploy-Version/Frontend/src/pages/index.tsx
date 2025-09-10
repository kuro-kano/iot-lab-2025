import Layout from "../components/layout";
import Footer from "../components/footer";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import ajPanwitImage from "../assets/images/aj-panwit.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="h-[600px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center shadow-lg transition-all duration-300 hover:bg-orange-900"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-6xl mb-4 font-bold tracking-tight">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2 className="text-xl text-orange-100">แหล่งรวมความรู้และกาแฟดีๆ สำหรับคุณ</h2>
        <div className="mt-8">
          <Link
            to="/books"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 mr-4"
          >
            ดูรายการหนังสือ
          </Link>
          <Link
            to="/staff"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            สำหรับพนักงาน
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-orange-800">เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Keep the original paragraph as requested */}
          <p className="text-left col-span-2 text-lg leading-relaxed text-gray-700">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things
            โค้ดชุดนี้เป็นโค้ดตัวอย่างในหัวข้อ Hono และ React ในวิชานี้
          </p>
          <p className="text-left col-span-2 text-lg leading-relaxed text-gray-700">
            <br /> จัดทำโดย นายธันยา วรมงคล รหัสนักศึกษา 66070091
          </p>

          <div className="shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105">
            <img src={ajPanwitImage} alt="Panwit Tuwanut" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-orange-800 mb-12">บริการของเรา</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">หนังสือหลากหลาย</h3>
              <p className="text-gray-600">รวบรวมหนังสือด้านเทคโนโลยีและการเขียนโปรแกรมที่น่าสนใจ</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 text-4xl mb-4">☕</div>
              <h3 className="text-xl font-semibold mb-2">กาแฟพรีเมียม</h3>
              <p className="text-gray-600">เครื่องดื่มคุณภาพ ชงด้วยใจ พร้อมเสิร์ฟความสดชื่น</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-orange-600 text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">พื้นที่ทำงาน</h3>
              <p className="text-gray-600">บรรยากาศดี เหมาะแก่การทำงานและการเรียนรู้</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Image Section */}
      <section className="relative w-full h-[400px] overflow-hidden group">
        <img
          src={coffeeImage}
          alt="Coffee"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <p className="text-white text-4xl font-bold text-center px-4">
            "ที่ที่ความรู้และความอร่อยมาบรรจบกัน"
          </p>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
