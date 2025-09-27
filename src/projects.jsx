import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useContext } from 'react'
import {Global} from './global-context'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#242B38",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: '#131927',
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SUPABASE_URL = "https://gaqusbyuccwvewdrgmeh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhcXVzYnl1Y2N3dmV3ZHJnbWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjkxMTEsImV4cCI6MjA3MzE0NTExMX0.WVgkVSG56QaHHKvciGy_vGmneLcwwfzP3b4qxea-7sg";
export const axiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  },
});
export default function Projects() {
  const {notif,setNotif} = useContext(Global)
  const [uniName, setUniName] = useState({})
  function valueFun(param) {
    const { id, value } = param.target
    setUniName((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const [uniEmail, setUniEmail] = useState({})
  function valueFunEmail(param) {
    const { id, value } = param.target
    setUniEmail((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const [openDetail, setOpenDetail] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(null)

  const [newUser, setNewUser] = useState({});
  function handleNewUserChange(e) {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }
  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(
        "/table",
        { name: newUser.name, email: newUser.email, date: newUser.date, product: newUser.product, price: newUser.price, },
        { headers: { Prefer: "return=representation" } }
      );
      return res.data;
    },
    onSuccess: (apiData) => {
      queryClient.setQueryData(["products"], (oldData) => [
        ...(oldData || []),
        apiData[0],
      ]);
      setNewUser({ name: "", email: "", date: "", product: "", price: "", });
    },
  });

  const queryClient = useQueryClient();
  async function fetchData() {
    try {
      const res = await axiosInstance.get("/table?select=*");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 0
  });

  const [search, setSearch] = useState('');
  const [res, setRes] = useState(data);



  useEffect(() => {
    if (!search.trim()) {
      setRes(data);
    } else {
      const output = data.filter((item) =>
        (item.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.date?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.product?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.price?.toLowerCase() || "").includes(search.toLowerCase())
      );
      setRes(output);
    }
  }, [search, data]);


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/table?id=eq.${id}`);
      return id;
    },
    onSuccess: (_data, id) => {
      queryClient.setQueryData(["products"], (curElem) => {
        return curElem?.filter((item) => item.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (id) => {
      if (!uniName[id] && !uniEmail[id]) {
        throw new Error("Update skipped: name is empty");
      }
      const res = await axiosInstance.patch(`/table?id=eq.${id}`, { name: uniName[id], email: uniEmail[id] }, { headers: { Prefer: "return=representation" } })
      return res.data;
    },
    onSuccess: (apiData, id) => {
      queryClient.setQueryData(["products"], (oldData) => {
        return oldData.map((curPost) => {
          return curPost.id === id ? { ...curPost, name: apiData[0].name, email: apiData[0].email } : curPost;
        })
      });
      setUniName((prev) => ({ ...prev, [id]: "" }));
      setUniEmail((prev) => ({ ...prev, [id]: "" }));
    }
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error fetching Data</h2>;

  return (
    <div className='w-[78vw]'>
      <div className='flex flex-col mt-3'>
        <div className='flex justify-between w-[100%]'>
          <h1>Users</h1>
          <button className="!bg-[#3c3fff]" onClick={() => { setOpenDetail(true) }}>
            <i className="fa-solid fa-plus"></i> <b>Add Users</b>
          </button>
        </div>
        <div className='flex my-5'>
          <form onSubmit={(e) => e.preventDefault()}>
            <i className="mt-[13px] ml-[10px] absolute fa-solid fa-magnifying-glass"></i>
            <input className='w-[200px] h-10 pl-[30px] rounded border-1 border-white' placeholder='Search Users' type="search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
          </form>
          {/* <i className="fa-solid fa-filter p-5"></i> */}
        </div>
      </div>
      <Fragment>
        <Dialog onClose={() => setOpenDetail(false)} open={openDetail}>
          <DialogTitle style={{ padding: '50px', borderRadius: '10px', gap: '10px', display: 'flex', flexDirection: 'column' }}>
            <input style={{ height: '25px', borderRadius: '5px' }} type="text" name="name" placeholder="username..." value={newUser.name} onChange={handleNewUserChange} />
            <input style={{ height: '25px', borderRadius: '5px' }} type="email" name="email" placeholder="email..." value={newUser.email} onChange={handleNewUserChange} />
            <input style={{ height: '25px', borderRadius: '5px' }} type="date" name="date" value={newUser.date} onChange={handleNewUserChange} />
            <input style={{ height: '25px', borderRadius: '5px' }} type="text" name="product" placeholder="product..." value={newUser.product} onChange={handleNewUserChange} />
            <input style={{ height: '25px', borderRadius: '5px' }} type="text" name="price" placeholder="price..." value={newUser.price} onChange={handleNewUserChange} />
            <button onClick={() => { addMutation.mutate(); setOpenDetail(false); setNotif(notif + 1) }}>Add User</button>
          </DialogTitle>
        </Dialog>
      </Fragment>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TableContainer className="!bg-[#121b29] border-[1px] !border-gray-400" component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>product</StyledTableCell>
                  <StyledTableCell>price</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(search.length > 0 ? res : data)?.map((p) => (
                  <StyledTableRow key={p.id}>
                    <StyledTableCell className="!text-gray-400">{p.id}</StyledTableCell>
                    <StyledTableCell className="!text-gray-400">{p.name}</StyledTableCell>
                    <StyledTableCell className="!text-gray-400">{p.email}</StyledTableCell>
                    <StyledTableCell className="!text-gray-400">{p.date}</StyledTableCell>
                    <StyledTableCell className="!text-gray-400">{p.product}</StyledTableCell>
                    <StyledTableCell className="!text-gray-400">{p.price}</StyledTableCell>
                    <StyledTableCell className="!text-gray-400" align="center">
                      <button onClick={() => setOpenUpdate(p.id)}><i className="fa-solid fa-pen-to-square"></i></button>
                      <button onClick={() => deleteMutation.mutate(p.id)} style={{ marginLeft: "10px" }}>
                        <i className="fa-solid fa-trash"></i>
                      </button>

                      <Fragment>
                        <Dialog onClose={() => setOpenUpdate(null)} open={openUpdate == p.id}>
                          <DialogTitle style={{ padding: '50px', borderRadius: '10px', gap: '5px', display: 'flex', flexDirection: 'column' }}>
                            <input style={{ height: '25px', borderRadius: '5px' }} type="text" placeholder="username..." id={p.id} value={uniName[p.id] || ""} onChange={valueFun} />
                            <input style={{ height: '25px', borderRadius: '5px' }} type="email" placeholder="email.." id={p.id} value={uniEmail[p.id] || ""} onChange={valueFunEmail} />
                            <button style={{}} onClick={() => { updateMutation.mutate(p.id); setOpenUpdate(null) }}>Update</button>
                          </DialogTitle>
                        </Dialog>
                      </Fragment>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    </div>
  );
}