import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

import { menuItems } from "routes/routes.routes";
import { StyledDivLogo } from "./Layout.styles";

const { Header, Content, Footer, Sider } = Layout;

export default function AppLayout() {
  const renderMenuItems = (items: typeof menuItems) =>
    items.map((item) => (
      <Menu.Item key={item.to} icon={item.icon}>
        <Link to={item.to}>{item.name}</Link>
      </Menu.Item>
    ));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <StyledDivLogo className="logo">JSONPLACEHOLDER</StyledDivLogo>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
