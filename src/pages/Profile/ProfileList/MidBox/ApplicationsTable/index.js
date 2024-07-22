import React from 'react';
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import {FaSearch} from "react-icons/fa";

const data = [
    {
        key: '1',
        company: 'Amazon',
        position: 'Software Development Engineer',
        location: 'New York, NY',
        sponsor: 'No Sponsor · accept OPT',
        type: 'Full-time',
        salary: '$16/hr',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: '2',
        company: 'BoLe Network',
        position: 'Marketing',
        location: 'London, UK',
        sponsor: 'Sponsor',
        type: 'Full-time',
        salary: 'unpaid',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: '3',
        company: 'Google',
        position: 'Business Analyst',
        location: 'Boston, MA',
        sponsor: 'No Sponsor · accept CPT',
        type: 'Full-time',
        salary: '$20/hr',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: '4',
        company: 'Meta',
        position: 'Product Manager',
        location: 'San Francisco, CA',
        sponsor: 'No Sponsor',
        type: 'Full-time',
        salary: '$50/hr',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: '5',
        company: 'Amazon',
        position: 'Software Development Engineer',
        location: 'New York, NY',
        sponsor: 'No Sponsor · accept OPT',
        type: 'Full-time',
        salary: '$16/hr',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: '6',
        company: 'BoLe Network',
        position: 'Marketing',
        location: 'London, UK',
        sponsor: 'Sponsor',
        type: 'Full-time',
        salary: 'unpaid',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: '7',
        company: 'Google',
        position: 'Business Analyst',
        location: 'Boston, MA',
        sponsor: 'No Sponsor · accept CPT',
        type: 'Full-time',
        salary: '$20/hr',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: '8',
        company: 'Meta',
        position: 'Product Manager',
        location: 'San Francisco, CA',
        sponsor: 'No Sponsor',
        type: 'Full-time',
        salary: '$50/hr',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
];

class ApplicationsTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    {/*<FaSearch/>*/}
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <FaSearch/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [
            {
                title: 'Company',
                dataIndex: 'company',
                key: 'company',
                width: '12%',
                ...this.getColumnSearchProps('company'),
            },
            {
                title: 'Position',
                dataIndex: 'position',
                key: 'position',
                width: '20%',
                ...this.getColumnSearchProps('position'),
            },
            {
                title: 'Location',
                dataIndex: 'location',
                key: 'location',
                width: '18%',
                ...this.getColumnSearchProps('location'),
            },
            {
                title: 'Sponsor',
                dataIndex: 'sponsor',
                key: 'sponsor',
                width: '20%',
                ...this.getColumnSearchProps('sponsor'),
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width: '10%',
                ...this.getColumnSearchProps('type'),
            },
            {
                title: 'Salary',
                dataIndex: 'salary',
                key: 'salary',
                width: '10%',
                ...this.getColumnSearchProps('salary'),
            },
        ];
        return <Table columns={columns} dataSource={data}
                      // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                      pagination={{ pageSize: 8 }} scroll={{ y: 420 }}
                      style={{ width: '66%', height: 'calc(100vh - 360px)', marginLeft: '28%', marginTop: '20px'}} />;
    }
}

export default ApplicationsTable;
