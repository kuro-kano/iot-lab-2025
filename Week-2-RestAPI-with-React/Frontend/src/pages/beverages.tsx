import Layout from "../components/layout";
import { useState } from "react";
import { Card, Badge, Button, Group, Text, NumberInput, Modal, Textarea, Paper, Divider } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import bgCafe from "../assets/images/bg-cafe-2.jpg";
import axios from "axios";

interface Beverage {
  id: number;
  name: string;
  basePrice: number;
  category: "coffee" | "tea" | "other";
  description: string;
  image?: string;
  availableSizes: ("small" | "medium" | "large")[];
  availableTypes: ("hot" | "iced" | "frappe")[];
  customizable: {
    sweetness?: boolean;
    milk?: boolean;
  };
}

const beverages: Beverage[] = [
  {
    id: 1,
    name: "Espresso",
    basePrice: 60,
    category: "coffee",
    description: "เอสเพรสโซ่เข้มข้น รสชาติเข้มข้น กลมกล่อม",
    availableSizes: ["small", "medium"],
    availableTypes: ["hot"],
    customizable: {
      milk: false,
      sweetness: false,
    },
  },
  {
    id: 2,
    name: "Cappuccino",
    basePrice: 75,
    category: "coffee",
    description: "คาปูชิโน่ หอมกลิ่นกาแฟ ผสมนมสดและฟองนม",
    availableSizes: ["small", "medium", "large"],
    availableTypes: ["hot", "iced"],
    customizable: {
      sweetness: true,
    },
  },
  {
    id: 3,
    name: "Green Tea Latte",
    basePrice: 70,
    category: "tea",
    description: "ชาเขียวนมสด หอมละมุน",
    availableSizes: ["small", "medium", "large"],
    availableTypes: ["hot", "iced", "frappe"],
    customizable: {
      sweetness: true,
    },
  },
  {
    id: 4,
    name: "Thai Tea",
    basePrice: 65,
    category: "tea",
    description: "ชาไทยสูตรต้นตำรับ หอมมัน",
    availableSizes: ["small", "medium", "large"],
    availableTypes: ["hot", "iced"],
    customizable: {
      sweetness: true,
    },
  },
  {
    id: 5,
    name: "Chocolate Frappe",
    basePrice: 85,
    category: "other",
    description: "ช็อคโกแลตปั่น เย็นฉ่ำ หวานละมุน",
    availableSizes: ["medium", "large"],
    availableTypes: ["frappe"],
    customizable: {
      sweetness: true,
    },
  }
];

interface OrderOptions {
  size: "small" | "medium" | "large";
  type: "hot" | "iced" | "frappe";
  sweetness?: number;
  notes?: string;
}

export default function BeveragesPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "coffee" | "tea" | "other">("all");
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedBeverage, setSelectedBeverage] = useState<Beverage | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [orderOptions, setOrderOptions] = useState<OrderOptions>({
    size: "medium",
    type: "iced",
    sweetness: 100,
  });

  const filteredBeverages = beverages.filter(
    (beverage) => selectedCategory === "all" || beverage.category === selectedCategory
  );

  const calculatePrice = (beverage: Beverage, options: OrderOptions) => {
    let price = beverage.basePrice;
    
    // Size adjustments
    if (options.size === "large") price += 20;
    else if (options.size === "small") price -= 10;
    
    // Type adjustments
    if (options.type === "frappe") price += 15;
    
    return price;
  };

  const handleOrder = (beverage: Beverage) => {
    setSelectedBeverage(beverage);
    setQuantity(1);
    // Set default options based on beverage availability
    setOrderOptions({
      size: beverage.availableSizes[0],
      type: beverage.availableTypes[0],
      sweetness: beverage.customizable.sweetness ? 100 : undefined,
    });
    setOrderModalOpen(true);
  };

  // Helper functions for translations
  const getThaiSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small": return "เล็ก";
      case "medium": return "กลาง";
      case "large": return "ใหญ่";
    }
  };

  const getThaiType = (type: "hot" | "iced" | "frappe") => {
    switch (type) {
      case "hot": return "ร้อน";
      case "iced": return "เย็น";
      case "frappe": return "ปั่น";
    }
  };

    const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<{
    beverage: Beverage;
    options: OrderOptions;
    quantity: number;
    totalPrice: number;
  } | null>(null);

  const confirmOrder = async () => {
    if (selectedBeverage) {
      const totalPrice = calculatePrice(selectedBeverage, orderOptions) * quantity;
      
      try {
        // ส่งข้อมูลไปยัง API
        await axios.post("/orders", {
          name: selectedBeverage.name,
          size: orderOptions.size,
          type: orderOptions.type,
          sweetness: orderOptions.sweetness,
          notes: orderOptions.notes,
          quantity: quantity,
          totalPrice: totalPrice,
        });

        setCurrentOrder({
          beverage: selectedBeverage,
          options: orderOptions,
          quantity: quantity,
          totalPrice: totalPrice
        });
        setOrderModalOpen(false);
        setShowConfirmation(true);
      } catch (error) {
        console.error("Failed to create order:", error);
        // แสดง error notification
        alert("เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[300px] w-full bg-cover bg-center bg-orange-800 bg-blend-multiply mb-8"
        style={{
          backgroundImage: `url(${bgCafe})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">เครื่องดื่ม</h1>
          <p className="text-xl text-orange-100">เลือกเครื่องดื่มที่คุณชื่นชอบ</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-12 flex justify-center">
          <Paper shadow="sm" radius="xl" className="p-1 bg-orange-50">
            <Group gap="xs">
              <Button
                variant={selectedCategory === "all" ? "filled" : "subtle"}
                color="orange"
                onClick={() => setSelectedCategory("all")}
                radius="xl"
                size="md"
                className={selectedCategory === "all" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                ทั้งหมด
              </Button>
              <Button
                variant={selectedCategory === "coffee" ? "filled" : "subtle"}
                color="orange"
                onClick={() => setSelectedCategory("coffee")}
                radius="xl"
                size="md"
                className={selectedCategory === "coffee" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                กาแฟ
              </Button>
              <Button
                variant={selectedCategory === "tea" ? "filled" : "subtle"}
                color="orange"
                onClick={() => setSelectedCategory("tea")}
                radius="xl"
                size="md"
                className={selectedCategory === "tea" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                ชา
              </Button>
              <Button
                variant={selectedCategory === "other" ? "filled" : "subtle"}
                color="orange"
                onClick={() => setSelectedCategory("other")}
                radius="xl"
                size="md"
                className={selectedCategory === "other" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                อื่นๆ
              </Button>
            </Group>
          </Paper>
        </div>

        {/* Beverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeverages.map((beverage) => (
            <Card 
              key={beverage.id} 
              shadow="sm" 
              padding="lg" 
              radius="lg" 
              withBorder 
              className="hover:shadow-lg transition-shadow duration-200 border-orange-100"
            >
              <Card.Section>
                <div className="h-48 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center relative overflow-hidden">
                  {beverage.image ? (
                    <img
                      src={beverage.image}
                      alt={beverage.name}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Text size="4xl" className="text-orange-300 transform hover:scale-110 transition-transform duration-300">
                      {beverage.category === "coffee" ? "☕" : beverage.category === "tea" ? "🫖" : "🥤"}
                    </Text>
                  )}
                </div>
              </Card.Section>

              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <Text size="xl" fw={600} className="text-gray-800">
                    {beverage.name}
                  </Text>
                  <Badge 
                    color="orange" 
                    variant="light" 
                    size="lg"
                    className="bg-orange-50"
                  >
                    {beverage.basePrice} ฿
                  </Badge>
                </div>

                <Text size="sm" color="dimmed" className="h-12 mb-4 line-clamp-2">
                  {beverage.description}
                </Text>

                <div className="space-y-3 mb-4">
                  {/* Available Types */}
                  <div>
                    <Text size="sm" fw={500} className="mb-2 text-gray-600">
                      รูปแบบ:
                    </Text>
                    <Group gap="xs">
                      {beverage.availableTypes.map((type) => (
                        <Badge 
                          key={type} 
                          color="orange" 
                          variant="dot" 
                          size="sm"
                          className="bg-orange-50"
                        >
                          {type === "hot" ? "ร้อน" : type === "iced" ? "เย็น" : "ปั่น"}
                        </Badge>
                      ))}
                    </Group>
                  </div>

                  {/* Available Sizes */}
                  <div>
                    <Text size="sm" fw={500} className="mb-2 text-gray-600">
                      ขนาด:
                    </Text>
                    <Group gap="xs">
                      {beverage.availableSizes.map((size) => (
                        <Badge 
                          key={size} 
                          color="orange" 
                          variant="dot" 
                          size="sm"
                          className="bg-orange-50"
                        >
                          {size === "small" ? "เล็ก" : size === "medium" ? "กลาง" : "ใหญ่"}
                        </Badge>
                      ))}
                    </Group>
                  </div>

                  {/* Customization Options */}
                  {beverage.customizable.sweetness && (
                    <Badge 
                      color="yellow" 
                      variant="light" 
                      size="sm"
                      className="bg-yellow-50"
                    >
                      ปรับความหวานได้
                    </Badge>
                  )}
                </div>

                <Button
                  variant="filled"
                  color="orange"
                  fullWidth
                  radius="xl"
                  size="md"
                  onClick={() => handleOrder(beverage)}
                  className="bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  สั่งซื้อ
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Modal */}
        <Modal
          opened={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          title={`สั่งซื้อ ${selectedBeverage?.name}`}
          size="md"
        >
          {selectedBeverage && (
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <Text fw={500} size="sm" mb="xs">ขนาด</Text>
                <Group gap="xs">
                  {selectedBeverage.availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={orderOptions.size === size ? "filled" : "light"}
                      color="orange"
                      onClick={() => setOrderOptions({ ...orderOptions, size })}
                      size="sm"
                    >
                      {getThaiSize(size)}
                    </Button>
                  ))}
                </Group>
              </div>

              {/* Type Selection */}
              <div>
                <Text fw={500} size="sm" mb="xs">ประเภท</Text>
                <Group gap="xs">
                  {selectedBeverage.availableTypes.map((type) => (
                    <Button
                      key={type}
                      variant={orderOptions.type === type ? "filled" : "light"}
                      color="orange"
                      onClick={() => setOrderOptions({ ...orderOptions, type })}
                      size="sm"
                    >
                      {getThaiType(type)}
                    </Button>
                  ))}
                </Group>
              </div>

              {/* Sweetness Slider */}
              {selectedBeverage.customizable.sweetness && (
                <div>
                  <Text fw={500} size="sm" mb="xs">ระดับความหวาน</Text>
                  <NumberInput
                    value={orderOptions.sweetness}
                    onChange={(val) => setOrderOptions({ ...orderOptions, sweetness: typeof val === 'number' ? val : 100 })}
                    min={0}
                    max={100}
                    step={25}
                    rightSection={<Text size="sm">%</Text>}
                  />
                </div>
              )}

              {/* Quantity and Price */}
              <div className="pt-2">
                <NumberInput
                  label="จำนวน"
                  value={quantity}
                  onChange={(val) => setQuantity(typeof val === 'number' ? val : 1)}
                  min={1}
                  max={10}
                  size="md"
                  className="mb-4"
                  rightSection={<Text size="sm">แก้ว</Text>}
                />
              </div>

              {/* Notes */}
              <div className="mb-4">
                <Textarea
                  label="หมายเหตุเพิ่มเติม"
                  placeholder="เช่น ไม่ใส่วิปครีม, เพิ่มช็อตกาแฟ"
                  value={orderOptions.notes}
                  onChange={(e) => setOrderOptions({ ...orderOptions, notes: e.currentTarget.value })}
                  minRows={2}
                />
              </div>

              <Paper p="md" radius="md" className="bg-orange-50 mb-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Text size="sm">ราคาต่อแก้ว:</Text>
                    <Text fw={500}>{calculatePrice(selectedBeverage, orderOptions)} บาท</Text>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <Text fw={500}>ราคารวม:</Text>
                    <Text fw={700} size="xl" color="orange">
                      {calculatePrice(selectedBeverage, orderOptions) * quantity} บาท
                    </Text>
                  </div>
                </div>
              </Paper>

              <Button 
                fullWidth 
                color="orange" 
                onClick={confirmOrder} 
                size="lg"
                leftSection={<IconShoppingCart size={20} />}
                className="bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                ยืนยันการสั่งซื้อ
              </Button>
            </div>
          )}
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          opened={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          size="md"
          radius="md"
          padding="xl"
          centered
          title={
            <Text size="xl" fw={600} className="text-orange-800">
              ✨ สั่งซื้อสำเร็จ
            </Text>
          }
        >
          {currentOrder && (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="text-center">
                <Text size="xl" className="mb-2">
                  {currentOrder.beverage.name}
                </Text>
                <Badge size="xl" radius="md" className="bg-green-50 text-green-700 border-green-200">
                  รอดำเนินการ
                </Badge>
              </div>

              {/* Order Details */}
              <Paper className="bg-orange-50 p-4 space-y-3" radius="md">
                <div className="flex justify-between">
                  <Text fw={500}>ขนาด</Text>
                  <Text>{getThaiSize(currentOrder.options.size)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text fw={500}>ประเภท</Text>
                  <Text>{getThaiType(currentOrder.options.type)}</Text>
                </div>
                {currentOrder.options.sweetness !== undefined && (
                  <div className="flex justify-between">
                    <Text fw={500}>ความหวาน</Text>
                    <Text>{currentOrder.options.sweetness}%</Text>
                  </div>
                )}
                <div className="flex justify-between">
                  <Text fw={500}>จำนวน</Text>
                  <Text>{currentOrder.quantity} แก้ว</Text>
                </div>
                {currentOrder.options.notes && (
                  <div className="pt-2 border-t border-orange-200">
                    <Text fw={500} mb={2}>หมายเหตุ</Text>
                    <Text size="sm" className="text-gray-600">{currentOrder.options.notes}</Text>
                  </div>
                )}
              </Paper>

              {/* Price Summary */}
              <Paper p="md" radius="md" className="bg-green-50">
                <div className="flex justify-between items-center">
                  <div>
                    <Text fw={500} size="lg">ราคารวมทั้งสิ้น</Text>
                    <Text size="sm" className="text-gray-600">
                      {currentOrder.quantity} แก้ว × {calculatePrice(currentOrder.beverage, currentOrder.options)} บาท
                    </Text>
                  </div>
                  <Text size="xl" fw={700} className="text-green-700">
                    {currentOrder.totalPrice} บาท
                  </Text>
                </div>
              </Paper>

              <div className="pt-2">
                <Text size="sm" className="text-gray-500 mb-4 text-center">
                  กรุณารอสักครู่ พนักงานจะเรียกชื่อเครื่องดื่มของคุณเมื่อเตรียมเสร็จ
                </Text>
                <Button
                  fullWidth
                  color="green"
                  size="lg"
                  onClick={() => setShowConfirmation(false)}
                  className="bg-green-600 hover:bg-green-700 transition-colors"
                >
                  ตกลง
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}
