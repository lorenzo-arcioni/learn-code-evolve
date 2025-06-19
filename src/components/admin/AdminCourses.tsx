import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import adminApi from "@/services/adminApi";
import { toast } from "sonner";

const AdminCourses = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    duration: "",
    price: 0,
    instructor: "",
    image_url: "",
    status: "active",
    course_url: "", // Added course URL field
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? value : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await adminApi.addCourse(formData);
      toast.success("Course added successfully");
      setFormData({
        title: "",
        description: "",
        category: "",
        level: "beginner",
        duration: "",
        price: 0,
        instructor: "",
        image_url: "",
        status: "active",
        course_url: "", // Reset course URL
      });
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Course title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  <SelectItem value="Deep Learning">Deep Learning</SelectItem>
                  <SelectItem value="NLP">NLP</SelectItem>
                  <SelectItem value="Computer Vision">Computer Vision</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Statistics">Statistics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                name="level"
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 10 weeks"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Course price"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor Name</Label>
              <Input
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Instructor name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Course Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="URL to course image"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course_url">Course URL</Label>
            <Input
              id="course_url"
              name="course_url"
              value={formData.course_url}
              onChange={handleChange}
              placeholder="URL to access the course (e.g., https://example.com/courses/machine-learning)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the course content and objectives"
              rows={6}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Course"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminCourses;
