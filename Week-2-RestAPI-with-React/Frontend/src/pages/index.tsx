import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import ajPanwitImage from "../assets/images/aj-panwit.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[600px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center shadow-lg transition-all duration-300 hover:bg-orange-900"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-6xl mb-4 font-bold tracking-tight">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2 className="text-xl text-orange-100">ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>

      <section className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-orange-800">เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <p className="text-left col-span-2 text-lg leading-relaxed text-gray-700">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things
            โค้ดชุดนี้เป็นโค้ดตัวอย่างในหัวข้อ Hono และ React ในวิชานี้
          </p>

          <div className="shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105">
            <img src={ajPanwitImage} alt="Panwit Tuwanut" className="h-full w-full object-cover" />
          </div>
        </div>

        <p className="text-right mt-12 text-gray-600 italic leading-relaxed">
          ปัจจุบันค่าเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ ....
        </p>
      </section>

      <section className="w-full flex justify-center overflow-hidden">
        <img
          src={coffeeImage}
          alt="Coffee"
          className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </section>
    </Layout>
  );
}
