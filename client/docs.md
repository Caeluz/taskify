# Docs for routing

1. Dynamic Route Folder = [folderName]
2. Static Route Folder = folderName
3. Catch All Route Folder = [...Slug]
4. Private Folder = \_folderName
5. Route Group = (folderName) folder name would be ommitted to the path ex: (admin) /dashboard
6. router.js = main routing file

- import { useRouter } from 'next/navigation';
- const router = useRouter();
  - router.push('/path');
    - router.replace('/path');
    - router.back();
