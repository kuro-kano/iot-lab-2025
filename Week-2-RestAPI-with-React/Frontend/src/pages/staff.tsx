import Layout from "../components/layout";
import { useState } from "react";
import { Badge, Text, Button, Group, Paper, Tabs, Card } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

interface Order {
  id: number;
  beverageName: string;
  size: string;
  type: string;
  sweetness?: number;
  notes?: string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "preparing" | "completed" | "cancelled";
  timestamp: Date;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 1,
    beverageName: "Cappuccino",
    size: "medium",
    type: "hot",
    quantity: 2,
    totalPrice: 150,
    status: "pending",
    notes: "ไม่ใส่วิปครีม",
    timestamp: new Date(),
  },
  {
    id: 2,
    beverageName: "Green Tea Latte",
    size: "large",
    type: "iced",
    sweetness: 50,
    quantity: 1,
    totalPrice: 85,
    status: "preparing",
    timestamp: new Date(),
  },
];

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "preparing":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "รอดำเนินการ";
      case "preparing":
        return "กำลังเตรียม";
      case "completed":
        return "เสร็จสิ้น";
      case "cancelled":
        return "ยกเลิก";
      default:
        return status;
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => 
    activeTab === "all" ? true : order.status === activeTab
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Text size="xl" fw={700} className="text-orange-800">
            รายการสั่งเครื่องดื่ม (สำหรับพนักงาน)
          </Text>
        </div>

        <Paper shadow="xs" p="md" className="mb-6">
          <Tabs defaultValue="pending" value={activeTab} onChange={(value) => value && setActiveTab(value)}>
            <Tabs.List>
              <Tabs.Tab value="pending" leftSection={<IconClock size={16} />}>
                รอดำเนินการ
              </Tabs.Tab>
              <Tabs.Tab value="preparing">กำลังเตรียม</Tabs.Tab>
              <Tabs.Tab value="completed">เสร็จสิ้น</Tabs.Tab>
              <Tabs.Tab value="cancelled">ยกเลิก</Tabs.Tab>
              <Tabs.Tab value="all">ทั้งหมด</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Paper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section p="md" className="border-b">
                <Group justify="space-between">
                  <Text fw={500}>ออเดอร์ #{order.id}</Text>
                  <Badge color={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </Group>
              </Card.Section>

              <div className="space-y-3 mt-4">
                <Text size="lg" fw={500}>
                  {order.beverageName}
                </Text>
                <Group>
                  <Badge variant="light">{order.size}</Badge>
                  <Badge variant="light">{order.type}</Badge>
                  {order.sweetness !== undefined && (
                    <Badge variant="light">หวาน {order.sweetness}%</Badge>
                  )}
                </Group>

                {order.notes && (
                  <Text size="sm" c="dimmed">
                    หมายเหตุ: {order.notes}
                  </Text>
                )}

                <div className="flex justify-between items-center">
                  <Text>จำนวน: {order.quantity} แก้ว</Text>
                  <Text fw={500} className="text-orange-600">
                    ฿{order.totalPrice}
                  </Text>
                </div>

                <Text size="sm" c="dimmed">
                  เวลา: {order.timestamp.toLocaleTimeString()}
                </Text>

                {order.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="light"
                      color="blue"
                      onClick={() => updateOrderStatus(order.id, "preparing")}
                      fullWidth
                    >
                      เริ่มเตรียม
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                )}

                {order.status === "preparing" && (
                  <Button
                    variant="light"
                    color="green"
                    onClick={() => updateOrderStatus(order.id, "completed")}
                    fullWidth
                    className="mt-4"
                  >
                    เสร็จสิ้น
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
