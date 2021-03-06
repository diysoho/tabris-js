import {expect, restore, mockTabris} from '../../test';
import ClientStub from '../ClientStub';
import {create as createUi} from '../../../src/tabris/widgets/Ui';
import Drawer from '../../../src/tabris/widgets/Drawer';
import Composite from '../../../src/tabris/widgets/Composite';
import TextView from '../../../src/tabris/widgets/TextView';

describe('Drawer', function() {

  let ui, drawer, client;

  beforeEach(function() {
    client = new ClientStub();
    mockTabris(client);
    ui = createUi();
    drawer = ui.drawer;
  });

  afterEach(restore);

  it('can not be created standalone', function() {
    expect(() => {
      new Drawer({});
    }).to.throw(Error);
  });

  it('is a Drawer', function() {
    expect(drawer).to.be.an.instanceOf(Drawer);
  });

  it('SETs parent', function() {
    let createCall = client.calls({op: 'create', id: drawer.cid})[0];
    expect(createCall.properties).to.contain.all.keys({parent: ui.cid});
  });

  it('is child of ui', function() {
    expect(drawer.parent()).to.equal(ui);
  });

  it('can not be disposed', function() {
    expect(() => {
      drawer.dispose();
    }).to.throw(Error);
  });

  it('can not be reparented', function() {
    expect(() => {
      new Composite().append(drawer);
    }).to.throw(Error);
  });

  describe('instance: ', function() {

    beforeEach(function() {
      client.resetCalls();
    });

    describe('when a child is appended', function() {

      let child;

      beforeEach(function() {
        child = new TextView();
        client.resetCalls();
        drawer.append(child);
      });

      it("child's parent is set to the drawer", function() {
        let call = client.calls({op: 'set', id: child.cid})[0];
        expect(call.properties.parent).to.eql(drawer.cid);
      });

    });

    it('has "enabled" set to "false" by default', function() {
      expect(drawer.enabled).to.be.false;
    });

    describe('open', function() {

      it('CALLs open', function() {
        drawer.open();
        expect(client.calls({op: 'call', id: drawer.cid})[0].method).to.equal('open');
      });

    });

    describe('close', function() {

      it('CALLs close', function() {
        drawer.close();
        expect(client.calls({op: 'call', id: drawer.cid})[0].method).to.equal('close');
      });

    });

  });

});
