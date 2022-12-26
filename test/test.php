<?php

require_once ('dashboard.php');

class ventasTest  extends PHPUnit\Framework\TestCase {

    protected function setUp() {
        $this ->venta = new venta();
    }

    protected function tearDown() {
        unset($this-> venta);
    }

    public function testVenta() {
        $this->assertEquals ($this->venta->listar(),DataTable())
    }

    
}

