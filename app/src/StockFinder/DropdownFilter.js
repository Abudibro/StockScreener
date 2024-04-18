import React, { useState } from "react";
import { Form, Col } from 'react-bootstrap';

export default function DropdownFilter({ setting, onChange, xs }) {
    const { label, defaultValue, options } = setting;


    return (
        <Col>
            <Form.Group className="mb-4 mt-4">
                <Form.Label className="heading-text-weight-3 text-light">{label}</Form.Label>
                <Form.Select defaultValue={defaultValue} xs={xs} onChange={(e) => onChange(e.target.value)} className="p-2 heading-text-weight-4" style={{border: 'rgb(0 180 255) 3px solid', background: 'rgb(220 220 220)'}}>
                    {options.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Col>
    )
}