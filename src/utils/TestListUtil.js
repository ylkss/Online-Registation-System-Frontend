function classifyTests(data){
    const TestListData = [];

    // 遍历数据
    let i = 1;
    data.forEach((item) => {
        // 检查 TestList 是否已经包含了这个对象
        const isTestExist = TestListData.some(test => test.name === item.name);
        if(!isTestExist){
            TestListData.push({
                id: i,
                name: item.name,
                province: item.province,
                registerTime: item.registerTime,
            });
            i++
        }
    })
    return TestListData;
}

function formatTestTime(testTime) {
    const date = new Date(testTime);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
    return date.toLocaleDateString('zh-CN', options);
}

function getTestTimeList(TestInfoList, TestName){
    const TestTimeList = [];
    TestInfoList.forEach((item) => {
        // 调整时间格式"2024-05-06T16:00:00.000+00:00" => "2024-05-06 星期一"
        if(item.name === TestName){
            TestTimeList.push({
                id: item.id,
                testTime: formatTestTime(item.testTime),
            })
        }
    })
    return TestTimeList;
}

export { classifyTests, getTestTimeList }