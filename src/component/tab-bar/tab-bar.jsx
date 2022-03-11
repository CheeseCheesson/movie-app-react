import React from 'react'
import {Tabs} from 'antd'

const {TabPane} = Tabs

const TabBar = ({onChangeTabs}) => {
    return (
        <Tabs defaultActiveKey="1" centered onTabClick={(e)=> onChangeTabs(e)}>
            <TabPane
                tab={
                    <span>Search</span>
                }
                key="1"
            >

            </TabPane>
            <TabPane tab={
                <span>Rated</span>
                }
                key="2"
            >

            </TabPane>
        </Tabs>
    )
}

export default TabBar




