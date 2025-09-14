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
          "url('https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=1600&q=80')",
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
