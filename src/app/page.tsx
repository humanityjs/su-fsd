'use client';
import { useEffect, useState } from 'react';
import Dropdown from './components/Dropdown';
import ItemCard from './components/ItemCard';

type ISort = 'createdDate' | 'fileNameAsc' | 'fileNameDesc';

function Page() {
  const [data, setData] = useState<{ file: string; date: string }[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [sort, setSort] = useState<ISort | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/sort-data');
        const data = await res.json();
        setData(data);
        setStatus('success');
      } catch (error) {
        console.log('error', error);
        setStatus('error');
      }
    }
    fetchData();
  }, []);

  const handleSort = (sort: string) => {
    setSort(sort as ISort);
  };

  if (status === 'loading') {
    return 'Loading........';
  }

  if (status === 'error') {
    return 'An error occured. Please reload the page or try again later.';
  }

  const sortedData = data.sort((a, b) => {
    if (!sort) return 0;
    if (sort === 'createdDate') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sort === 'fileNameAsc') {
      return a.file.localeCompare(b.file, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    }
    if (sort === 'fileNameDesc') {
      return b.file.localeCompare(a.file, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    }
    return 0;
  });

  const dropdownItems = [
    { label: 'Created Date', value: 'createdDate' },
    { label: 'File Name (Asc)', value: 'fileNameAsc' },
    { label: 'File Name (Desc)', value: 'fileNameDesc' },
  ];

  return (
    <div className="p-24">
      <div className="max-w-[40rem] mx-auto flex flex-col items-center justify-center">
        <Dropdown onSort={handleSort} items={dropdownItems} />
        <div className="w-full grid grid-cols-2 gap-4 mt-12">
          {sortedData.map((item) => (
            <ItemCard date={item.date} file={item.file} key={item.file} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
