import Layout from "../components/layout";
import { useState } from "react";
import { Card, Badge, Button, Group, Text, NumberInput, Modal } from "@mantine/core";

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

  const confirmOrder = () => {
    if (selectedBeverage) {
      const totalPrice = calculatePrice(selectedBeverage, orderOptions) * quantity;
      const sweetnessText = orderOptions.sweetness !== undefined 
        ? `ความหวาน ${orderOptions.sweetness}%` 
        : "";
      alert(
        `สั่งซื้อ ${selectedBeverage.name}\n` +
        `ขนาด: ${getThaiSize(orderOptions.size)}\n` +
        `ประเภท: ${getThaiType(orderOptions.type)}\n` +
        `${sweetnessText}\n` +
        `จำนวน ${quantity} แก้ว\n` +
        `ราคารวม ${totalPrice} บาท`
      );
      setOrderModalOpen(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-orange-800 mb-8">เครื่องดื่ม</h1>

        {/* Category Filter */}
        <div className="mb-8">
          <Group>
            <Button
              variant={selectedCategory === "all" ? "filled" : "light"}
              color="orange"
              onClick={() => setSelectedCategory("all")}
            >
              ทั้งหมด
            </Button>
            <Button
              variant={selectedCategory === "coffee" ? "filled" : "light"}
              color="orange"
              onClick={() => setSelectedCategory("coffee")}
            >
              กาแฟ
            </Button>
            <Button
              variant={selectedCategory === "tea" ? "filled" : "light"}
              color="orange"
              onClick={() => setSelectedCategory("tea")}
            >
              ชา
            </Button>
            <Button
              variant={selectedCategory === "other" ? "filled" : "light"}
              color="orange"
              onClick={() => setSelectedCategory("other")}
            >
              อื่นๆ
            </Button>
          </Group>
        </div>

        {/* Beverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeverages.map((beverage) => (
            <Card key={beverage.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <div className="h-48 bg-orange-100 flex items-center justify-center">
                  {beverage.image ? (
                    <img
                      src={beverage.image}
                      alt={beverage.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Text size="xl" className="text-orange-300">
                      {beverage.category === "coffee" ? "☕" : beverage.category === "tea" ? "🫖" : "🥤"}
                    </Text>
                  )}
                </div>
              </Card.Section>

              <Group justify="apart" mt="md" mb="xs">
                <Text fw={500}>{beverage.name}</Text>
                <div>
                  <Badge color="orange" variant="light" className="mr-2">
                    เริ่มต้น {beverage.basePrice} บาท
                  </Badge>
                </div>
              </Group>

              <Text size="sm" color="dimmed" mb="md">
                {beverage.description}
              </Text>

              <div className="space-y-2 mb-4">
                {/* Available Types */}
                <Group gap="xs">
                  {beverage.availableTypes.map((type) => (
                    <Badge key={type} color="gray" variant="dot" size="sm">
                      {type === "hot" ? "ร้อน" : type === "iced" ? "เย็น" : "ปั่น"}
                    </Badge>
                  ))}
                </Group>

                {/* Available Sizes */}
                <Group gap="xs">
                  {beverage.availableSizes.map((size) => (
                    <Badge key={size} color="gray" variant="dot" size="sm">
                      {size === "small" ? "เล็ก" : size === "medium" ? "กลาง" : "ใหญ่"}
                    </Badge>
                  ))}
                </Group>

                {/* Customization Options */}
                {beverage.customizable.sweetness && (
                  <Badge color="yellow" variant="dot" size="sm">
                    ปรับความหวานได้
                  </Badge>
                )}
              </div>

              <Button
                variant="light"
                color="orange"
                fullWidth
                radius="md"
                onClick={() => handleOrder(beverage)}
              >
                สั่งซื้อ
              </Button>
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
                />
              </div>

              <div className="pt-2">
                <Text>ราคาต่อแก้ว: {calculatePrice(selectedBeverage, orderOptions)} บาท</Text>
                <Text fw={500} size="lg" color="orange">
                  ราคารวม: {calculatePrice(selectedBeverage, orderOptions) * quantity} บาท
                </Text>
              </div>

              <Button fullWidth color="orange" onClick={confirmOrder} size="lg">
                ยืนยันการสั่งซื้อ
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}
