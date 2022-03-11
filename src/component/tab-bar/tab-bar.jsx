import React from 'react'
import {Tabs} from 'antd'

const {TabPane} = Tabs

const TabBar = ({onChangeTabs}) => {
    return (
        <Tabs defaultActiveKey="1" centered onTabClick={(e)=> onChangeTabs(e)}>
            <TabPane
                tab={
                    <span>Tab 1</span>
                }
                key="1"
            >

            </TabPane>
            <TabPane tab={
                <span>Tab 2</span>
                }
                key="2"
            >

            </TabPane>
        </Tabs>
    )
}

export default TabBar




