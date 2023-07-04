import React, { Component } from "react";
import styles from "./DFSelect.module.css";
import { Menu, Dropdown as AntDropdown, ConfigProvider } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default class DFSelect extends Component<DFSelectProps> {
    onSelect = (item: any) => {
        if (this.props.onChange) {
            this.props.onChange(item);
        }
    };

    render() {
        const menu = (
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#003e29",
                    },
                }}
            >
                <Menu>
                    {this.props.options
                        ? this.props.options.map((v, i) => (
                              <Menu.Item
                                  key={v.value}
                                  onClick={() => this.onSelect(v)}
                              >
                                  <div
                                      className={
                                          styles.options +
                                          " bdyt " +
                                          this.props.optionsClassName
                                      }
                                  >
                                      {v.title}
                                  </div>
                              </Menu.Item>
                          ))
                        : null}
                </Menu>
            </ConfigProvider>
        );

        return (
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#003e29",
                    },
                }}
            >
                <div
                    className={this.props.className}
                    style={{ flex: this.props.flex || "1" }}
                >
                    <AntDropdown
                        overlay={menu}
                        trigger={["click"]}
                        disabled={this.props.disabled}
                    >
                        <div
                            className={styles.select_btn + " blc2 "}
                            style={{borderColor:"#003e29"}}
                            onClick={(e) => e.preventDefault()}
                        >
                            {this.props.value ? (
                                <div
                                    className={
                                        styles.top_title + " bglc1 fdc2 "
                                    }
                                >
                                    {this.props.placeholder}
                                </div>
                            ) : null}
                            {this.props.value ? (
                                <div className={styles.title + " bdyt"}>
                                    {this.props.value.title}
                                </div>
                            ) : (
                                <div className={styles.placeholder + " bdyt"}>
                                    {this.props.placeholder || "انتخاب کنید"}
                                </div>
                            )}

                            <DownOutlined className={styles.style_arrow} />
                        </div>
                    </AntDropdown>
                </div>
            </ConfigProvider>
        );
    }
}

interface Item {
    value: any;
    title: string;
}

export interface DFSelectProps {
    key?: string | number;
    flex?: number | string;
    options: Array<Item>;
    className?: string;
    optionsClassName?: string;
    title?: string;
    value?: Item;
    placeholder?: string;
    disabled?: boolean;
    ref?: (ref: DFSelect) => void;
    onChange?: (item: Item) => void;
}
