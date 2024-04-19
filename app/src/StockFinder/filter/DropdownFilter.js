import React, { useState } from "react";
import { Form, Col } from 'react-bootstrap';

export default function DropdownFilter({ setting, onChange, xs }) {
    const { label, defaultValue, options } = setting;


    return (
        <Col>
            <Form.Group className="mb-4 mt-4">
                <Form.Label className="heading-text-weight-3 text-light" style={{ whiteSpace: 'nowrap' }} >{label}</Form.Label>
                <Form.Select defaultValue={defaultValue} xs={xs} onChange={(e) => onChange(e.target.value)} className="p-3 heading-text-weight-4" style={{
                    border:'none',
                    background: '#00185f',
                    color: 'white',
                }}>
                    {options.map((option, index) => (
                        <option value={option.value} key={index}>{option.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Col>
    )
}