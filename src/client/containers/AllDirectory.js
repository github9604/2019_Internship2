import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
const { Content } = Layout;

class AllDirectory extends Component {

    render() {
        return (
            <Layout>
                <Content>
                    <Row type="flex" justify="center" align="center">
                        <Col span={6}> <img src="../src/asset/img/mine_close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/AllDirectory" id="header_a"><p> 전체 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/UserDirectory" id="header_a"><p> 내 폴더 </p></Link> </Col>
                        <Col span={6}> <img src="../src/asset/img/close_folder.png" width="50" alt="Logo Thing main logo"></img>
                            <Link to="/GroupDirectory" id="header_a"><p> 공유 폴더 </p></Link></Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default AllDirectory;