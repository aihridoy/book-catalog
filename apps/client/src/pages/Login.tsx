import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router";
import {
  setUser,
  setLoading,
  setError,
} from "../redux/features/user/userSlice";
import { useLoginMutation } from "../redux/features/user/userApi";
import type { UserLogin } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function Login() {
  const [form] = Form.useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const isError = useAppSelector((state) => state.user.isError);
  const error = useAppSelector((state) => state.user.error);

  const onFinish = async (values: UserLogin) => {
    dispatch(setLoading(true));

    try {
      const result = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setUser(result.data));
      dispatch(setLoading(false));
      navigate("/");
    } catch (err: unknown) {
      const errorMessage =
        (err as { data?: { error?: string } })?.data?.error ||
        "Failed to login";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1540915670365-f2d1d69d421c?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-2xl p-8 z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter email" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-md text-center mb-4">
            {error}
          </div>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
