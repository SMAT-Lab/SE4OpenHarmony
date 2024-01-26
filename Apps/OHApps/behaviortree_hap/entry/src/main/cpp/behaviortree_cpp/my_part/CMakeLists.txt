cmake_minimum_required(VERSION 3.16.3) # version on Ubuntu Focal
# 测试文件全部来自于examples文件夹

# examples文件夹下的t12_groot_howto.cpp编译，因为涉及到了SqliteLogger的部分（移植beharviortree到openharmony关闭了SQLite logging的部分）
# 因为添加t12_groot_howto可执行文件的编译会有如下报错。
# ld.lld: error: undefined symbol: BT::SqliteLogger::SqliteLogger(BT::Tree const&, std::__n1::__fs::filesystem::path const&, bool)

##################################### 单个编译可执行文件 ###############################################################
#生成执行二进制文件my_part
ADD_EXECUTABLE(my_part my_part.cpp)
# 头文件
target_include_directories(my_part PRIVATE  ${PROJECT_SOURCE_DIR}/include
                                            ${PROJECT_SOURCE_DIR}/sample_nodes)
# 链接库
TARGET_LINK_LIBRARIES(my_part PUBLIC behaviortree_cpp)

##################################### 批量编译可执行文件 ###############################################################


function(CompileExample name)
    add_executable(${name}  ${name}.cpp )
    target_include_directories(${name} PRIVATE ${PROJECT_SOURCE_DIR}/include
                                               ${PROJECT_SOURCE_DIR}/sample_nodes)
    target_link_libraries(${name} PUBLIC behaviortree_cpp bt_sample_nodes)
endfunction()

# 批量生成如下二进制文件，CompileExample("xxx")语句只能置于 function(CompileExample name) ...endfunction() 等语句后面
CompileExample("t01_build_your_first_tree") # t01_build_your_first_tree   编译只依赖behaviortree_cpp，执行依赖bt_sample_nodes
CompileExample("t02_basic_ports")           # t02_basic_ports             编译需要依赖bt_sample_nodes和behaviortree_cpp
CompileExample("t03_generic_ports")         # t03_generic_ports           编译只依赖behaviortree_cpp
CompileExample("t04_reactive_sequence")     # t04_reactive_sequence       编译需要依赖bt_sample_nodes和behaviortree_cpp
CompileExample("t05_crossdoor")             # t05_crossdoor               编译需要依赖bt_sample_nodes和behaviortree_cpp
CompileExample("t06_subtree_port_remapping")# t06_subtree_port_remapping  编译需要依赖bt_sample_nodes和behaviortree_cpp
CompileExample("t07_load_multiple_xml")     # t07_load_multiple_xml       编译需要依赖bt_sample_nodes和behaviortree_cpp
CompileExample("t08_additional_node_args")  # t08_additional_node_args    编译只依赖behaviortree_cpp
CompileExample("t09_scripting")             # t09_scripting               编译需要依赖bt_sample_nodes和behaviortree_cpp
CompileExample("t10_observer")              # t10_observer                只依赖behaviortree_cpp
CompileExample("t11_replace_rules")         # t11_replace_rules           只依赖behaviortree_cpp
CompileExample("ex01_wrap_legacy")
CompileExample("ex02_runtime_ports")
CompileExample("ex04_waypoints")

